import { NextResponse } from 'next/server';
import axios from 'axios';
export const dynamic = 'force-dynamic';


export async function POST(request) {
  try {
    const { careerTitle, missingSkills, userLevel } = await request.json();

    const prompt = `
      Create a detailed 3-6 month learning roadmap for someone who wants to become a ${careerTitle}.
      
      Missing skills to focus on: ${missingSkills}
      Current level: ${userLevel}
      
      Please provide a comprehensive roadmap in the following JSON format:
      {
        "roadmap": {
          "duration": "3-6 months",
          "phases": [
            {
              "phase": "Phase 1",
              "duration": "Month 1-2",
              "title": "Foundation Building",
              "tasks": [
                {
                  "task": "Task description",
                  "resources": ["resource1", "resource2"],
                  "estimated_time": "2 weeks"
                }
              ]
            }
          ],
          "recommended_tools": ["tool1", "tool2"],
          "practice_projects": ["project1", "project2"]
        }
      }
    `;

    const completion = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: "system",
            content: "You are a career advisor AI that creates detailed learning roadmaps. Always respond with valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      },
      {
        headers:{
          'Content-Type':'application/json',
          Authorization :`Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );
   const content = completion.data.choices[0].message.content;
    const response = JSON.parse(content);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error generating roadmap:', error?.response?.data||error.message);
    return NextResponse.json(
      { error: 'Failed to generate roadmap' },
      { status: 500 }
    );
  }
}