import { NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic';

// Clean unwanted AI tokens
function cleanAIResponse(text) {
  return text
    .replace(/```json|```js|```/gi, '')   // remove code fences
    .replace(/<s>|<\/s>/gi, '')           // remove mistral <s> tokens
    .replace(/^[^{\[]*/, '')              // remove junk before JSON
    .replace(/[^}\]]*$/, '')              // remove junk after JSON
    .trim();
}

export async function POST(request) {
  try {
    const { userSkills, careerTitle } = await request.json();

    const prompt = `
Create a detailed 3-6 month learning roadmap for someone who wants to become a ${careerTitle}. Missing skills to focus on: ${missingSkills} Current level: ${userLevel} Please provide a comprehensive roadmap in the following JSON format: { "roadmap": { "duration": "3-6 months", "phases": [ { "phase": "Phase 1", "duration": "Month 1-2", "title": "Foundation Building", "tasks": [ { "task": "Task description", "resources": ["resource1", "resource2"], "estimated_time": "2 weeks" } ] } ], "recommended_tools": ["tool1", "tool2"], "practice_projects": ["project1", "project2"] } }
`;

    const completion = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content:
              "Return ONLY valid JSON. No markdown, no text outside JSON, no explanations.",
          },
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

    let aiText = completion.data.choices[0].message.content;
    let cleaned = cleanAIResponse(aiText);

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error("Invalid JSON received:", cleaned);
      return NextResponse.json(
        { error: "Invalid JSON from AI", raw: cleaned },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error analyzing skill gap:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to analyze skill gap" },
      { status: 500 }
    );
  }
}
