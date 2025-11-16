import { NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic';

function cleanAIResponse(text) {
  return text
    .replace(/```json|```js|```/gi, '')    // remove code block markers
    .replace(/<s>|<\/s>/gi, '')             // remove <s> tokens from models like Mistral
    .replace(/^[^{\[]*/, '')                // trim everything before first { or [
    .replace(/[^}\]]*$/, '')                // trim everything after last } or ]
    .trim();
}

export async function POST(request) {
  try {
    const { skills, interests, education, workStyle, experience } = await request.json();

    const prompt = `
Based on the following user profile, suggest the top 5 most suitable career paths:

Skills: ${skills}
Interests: ${interests}
Education Level: ${education}
Work Style Preferences: ${workStyle}
Experience Level: ${experience}

Respond ONLY with valid JSON in this structure:

{
  "careers": [
    {
      "title": "Career Title",
      "description": "Short role description",
      "match_percentage": 85,
      "required_skills": ["skill1", "skill2"],
      "salary_range": "₹50,000 - ₹80,000",
      "growth_potential": "High"
    }
  ]
}
    `;

    const completion = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: "You are a JSON-only career advisor. NEVER include commentary, markdown, or code blocks." },
          { role: "user", content: prompt },
        ],
        temperature: 0.4,
        max_tokens: 1500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );

    let aiResponse = completion.data.choices[0].message.content;

    aiResponse = cleanAIResponse(aiResponse);

    let jsonParsed;

    try {
      jsonParsed = JSON.parse(aiResponse);
    } catch (err) {
      console.error("Invalid JSON received:", aiResponse);
      return NextResponse.json({ 
        error: "Invalid JSON received from AI", 
        raw: aiResponse 
      }, { status: 500 });
    }

    return NextResponse.json(jsonParsed);

  } catch (error) {
    console.error("Error generating career suggestions:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to generate career suggestions" },
      { status: 500 }
    );
  }
}
