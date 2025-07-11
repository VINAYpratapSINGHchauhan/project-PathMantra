import { NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic';

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

      Please provide your response in the following JSON format:
      {
        "careers": [
          {
            "title": "Career Title",
            "description": "Brief description of the role",
            "match_percentage": 85,
            "required_skills": ["skill1", "skill2", "skill3"],
            "salary_range": "$50,000 - $80,000",
            "growth_potential": "High"
          }
        ]
      }
    `;

    const completion = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct', // or another free model like "google/gemma-7b-it"
        messages: [
          {
            role: 'system',
            content:
              'You are a career advisor AI that provides personalized career recommendations based on user profiles. Always respond with valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );

    const content = completion.data.choices[0].message.content;
    const response = JSON.parse(content);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error generating career suggestions:', error?.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to generate career suggestions' },
      { status: 500 }
    );
  }
}
