import { ProductWithPrice, Song } from "@/types/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'


export const getSongs = async (): Promise<Song[]> => {
    
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const {data, error} = await supabase.from("songs")
    .select("*").order('created_at',{ascending: false})

    if(error){
        console.log(error.message);
        
    }

    return (data as any || [])
}
export const getLikedSongs = async (): Promise<Song[]> => {

    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const {data: {
        session
    }} = await supabase.auth.getSession()
    

    const {data, error} = await supabase.from("liked_songs")
    .select("*, songs(*)").eq('user_id', session?.user.id).order('created_at',{ascending: false})

    if(error){
        console.log(error.message);
        return []
    }

    if(!data) {
        return []
    }

    return data.map(item => ({
        ...item.songs
    }))
}

export const getSongsById = async (): Promise<Song[]> =>
{
    
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const {data: sessionData, error: sessionError} = await supabase.auth.getSession()
    if(sessionError){
        console.log(sessionError.message)
        return []
        
    }
    const {data, error} = await supabase.from("songs")
    .select("*").eq('user_id', sessionData.session?.user.id).order('created_at',{ascending: false})

    if(error){
        console.log(error.message);
        
    }

    return (data as any || [])
}
export const getSongsByTitle = async (title: string): Promise<Song[]> =>
{

    if(!title){
        const allSongs = await getSongs()
        return allSongs
    }
    
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const {data, error} = await supabase.from("songs")
    .select("*").ilike("title", `%${title}%`)
    .order('created_at',{ascending: false})

    if(error){
        console.log(error.message);
        
    }

    return (data as any || [])
}


export const getActiveProducts = async (): Promise<ProductWithPrice[]> => {
    
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const {data, error} = await supabase.from("products")
    .select("*, prices(*)").eq("active", true).eq("prices.active", true)
    .order("metadata->index")
    .order('unit_amount',{foreignTable: 'prices'})

    if(error){
        console.log(error.message);
        
    }

    return (data as any || [])
}