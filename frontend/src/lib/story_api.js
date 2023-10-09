import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qoztnzkxdceiiojdqhvy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvenRuemt4ZGNlaWlvamRxaHZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY3MjkxMDAsImV4cCI6MjAxMjMwNTEwMH0.TpjrRu4r2Mf3sfOdEMFCB1LTLqQc8_gH22KAab8x4nw";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getStories() {
  const { data, error } = await supabase
    .from("story")
    .select(
      `
      id,
      title,
      description,
      language_code,
      cover_image_url,
      cover_audio_url
  `
    )
    .eq("is_generated", true);

  if (error) {
    throw error;
  }

  return data;
}

export async function getStory(storyId) {
  let { data, error } = await supabase
    .from("story")
    .select(
      `
        id,
        title,
        description,
        language_code,
        cover_image_url,
        cover_audio_url
    `
    )
    .eq("id", storyId);

  const story = data;

  if (error) {
    throw error;
  }

  ({ data, error } = await supabase
    .from("story_page")
    .select(
      `
        id,
        page_number,
        text,
        story_page_image ( url ),
        story_page_audio ( url )
    `
    )
    .eq("story_id", storyId)
    .order("page_number"));

  const storyPages = [
    {
      id: "",
      page_number: "",
      title: story[0].title,
      text: "",
      story_page_image: [{ url: story[0].cover_image_url }],
      story_page_audio: {
        url: story[0].cover_audio_url,
      },
    },
    ...data.map((page) => {
      page.story_page_audio = page.story_page_audio[0];
      return page;
    }),
  ];

  if (error) {
    throw error;
  }

  const result = {
    id: story[0].id,
    title: story[0].title,
    description: story[0].description,
    language_code: story[0].language_code,
    cover_image_url: story[0].cover_image_url,
    pages: storyPages,
  };

  return result;
}
