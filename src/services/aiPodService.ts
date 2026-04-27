const DEFAULT_BASE = "https://ai-pod.aigctour.com";
const API_BASE = (import.meta.env.VITE_AI_POD_API_BASE_URL || DEFAULT_BASE).replace(/\/$/, "");

export interface StyleRedesignResponse {
  id: number;
  status: 'process' | 'success' | 'failed' | 'completed';
  input_img: string;
  output_img: string | null;
  prompt: string;
  created_at: string;
}

/**
 * Submits a style redesign task.
 * @param file The image file to redesign.
 * @param prompt Custom instructions for the AI.
 */
export async function submitStyleRedesign(file: File | Blob, prompt: string): Promise<StyleRedesignResponse> {
  // Try with and without trailing slash if 404 persists, but let's stick to the provided one first.
  const url = `${API_BASE}/api/v1/opc/style_redesign`;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('prompt', prompt || "Style redesign");

  console.log(`Submitting to: ${url}`);
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to submit style redesign: ${response.status} ${errorText}`);
  }

  return response.json();
}

/**
 * Polls for the completion of a style redesign task.
 * @param id The task ID.
 * @param interval Polling interval in ms (default 2000).
 * @param maxAttempts Maximum number of polling attempts (default 30).
 */
export async function pollStyleRedesign(
  id: number, 
  interval: number = 2000, 
  maxAttempts: number = 30
): Promise<string> {
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      // Trying common status query pattern: GET with ID
      const url = `${API_BASE}/api/v1/opc/style_redesign?id=${id}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Status check failed: ${response.status}`);
      }

      const data: StyleRedesignResponse = await response.json();
      
      // Check if output_img is present and status is not 'process'
      if (data.output_img && (data.status === 'success' || data.status === 'completed' || data.status !== 'process')) {
        // Build the full URL if it's a relative path
        if (data.output_img.startsWith('http')) {
          return data.output_img;
        }
        // If it returns an internal path like in the example, we might need to handle it.
        // But usually there's a way to access it via static serving.
        // For now, assume it's relative to API base if it starts with /api or similar,
        // or just return as is if it's an absolute internal path (which might fail in browser)
        return data.output_img;
      }

      if (data.status === 'failed') {
        throw new Error('AI Style Redesign task failed on server.');
      }
    } catch (error) {
      console.warn(`Polling attempt ${attempts + 1} failed:`, error);
    }

    attempts++;
    await new Promise(resolve => setTimeout(resolve, interval));
  }

  throw new Error('Task timed out.');
}
