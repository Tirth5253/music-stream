import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { Song } from "@/types";

const getSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
   
    cookies: cookies
  });

  const { data, error } = await supabase   //this will used to fetch songs
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
}

export default getSongs;    