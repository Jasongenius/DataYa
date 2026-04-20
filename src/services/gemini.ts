import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function generateRedesign(base64Image: string, prompt: string = "") {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1] || base64Image,
              mimeType: "image/jpeg",
            },
          },
          {
            text: `Act as a professional designer. Analyze the style (colors, brushwork, composition, mood) of this image. Then, create a COMPLETELY NEW art piece but inspired by the same "Style DNA". ${prompt ? `Follow these specific instructions: ${prompt}` : "Make it commercially viable for lifestyle products like bags and apparel."} Generate 3 distinct variants.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
      },
    });

    const images: string[] = [];
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          images.push(`data:image/png;base64,${part.inlineData.data}`);
        }
      }
    }

    return images;
  } catch (error) {
    console.error("Gemini Redesign Error:", error);
    return [];
  }
}

export async function enhanceArtwork(base64Image: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1] || base64Image,
              mimeType: "image/jpeg",
            },
          },
          {
            text: "Please enhance this artwork for production. Clean up any artifacts, optimize the contrast and colors for printing on fabric, and ensure the resolution feels high-quality. Return the enhanced version.",
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
      },
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Enhance Error:", error);
    return null;
  }
}
