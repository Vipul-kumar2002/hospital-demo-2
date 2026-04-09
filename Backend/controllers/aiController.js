import { GoogleGenerativeAI } from "@google/generative-ai";

export const transcribeHandwriting = async (req, res) => {
  const { images } = req.body;

  if (!images || !Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ message: "No images provided" });
  }

  try {
    // 🤖 1. INITIALIZE AI (Using your requested model)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // 📸 2. MULTIMODAL MAPPING (Your cleaned regex)
    const imageParts = images.map((img) => {
      const base64Data = img.replace(/^data:image\/\w+;base64,/, "");
      return {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg",
        },
      };
    });

    // 📝 3. THE PROMPT (Exactly as requested)
    const finalPrompt = `You are a medical data extraction expert for Ranchi City Hospital.
      Analyze the prescription images and return ONLY a valid JSON object.
      STRICT JSON STRUCTURE:
      {
        "patientId": "Extract if present, else null",
        "clinicalData": {
          "bloodPressure": "Value or Not Mentioned",
          "bloodGroup": "Value or Not Mentioned",
          "hemoglobin": "Value or Not Mentioned",
          "tests": ["List of tests or Not Mentioned"],
          "instructions": "Specific medication instructions",
          "generalAdvice": "Diet/Lifestyle advice",
          "revisit": "Follow up date/days"
        },
        "medicine": [
          {
            "medicineName": "Name + Strength",
            "dosage": "Frequency (e.g. 1-0-1)",
            "instruction": "Translated to English (e.g. After Food)"
          }
        ]
      }
      DO NOT include any conversational text. Return ONLY the JSON.`;

    console.log("🚀 Sending request to Gemini 3 Flash...");

    // 🚀 4. EXECUTE AI GENERATION
    const result = await model.generateContent([finalPrompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ transcription: text });
  } catch (error) {
    console.error("AI Error:", error);
    res
      .status(500)
      .json({ message: "AI Analysis Failed", error: error.message });
  }
};
