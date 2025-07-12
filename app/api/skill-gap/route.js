import { NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { userSkills, careerTitle } = await request.json();

    const prompt = `
      Analyze the skill gap for someone who wants to become a ${careerTitle}.
      
      User's current skills: ${userSkills}
      Target career: ${careerTitle}
      
      Please provide a detailed skill gap analysis in the following JSON format:
      {
        "existing_skills": ["skill1", "skill2"],
        "missing_skills": ["skill3", "skill4"],
        "skill_priorities": [
          {
            "skill": "skill_name",
            "priority": "High/Medium/Low",
            "description": "Why this skill is important"
          }
        ]
      }
    `;

    const completion = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'system',
            content: 'You are a career advisor AI that analyzes skill gaps for career transitions. Always respond with valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1500,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          
        },
      }
    );

    const responseText = completion.data.choices[0].message.content;
    const response = JSON.parse(responseText);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error analyzing skill gap:', error?.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to analyze skill gap' },
      { status: 500 }
    );
  }
}
