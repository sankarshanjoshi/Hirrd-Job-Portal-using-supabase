import supabaseClient from "@/utils/supabase";

export async function getJobs(token, {location, company_id, searchQuery}){
    const supabase = await supabaseClient(token);

    let query = supabase.from("jobs").select("*, saved: saved_job(id), company: companies(name,logo_url)")

    if(location){
        query = query.eq("location",location);
    }
    if(company_id){
        query = query.eq("company_id", company_id);
    }
    if(searchQuery){
        query = query.ilike("title",`%${searchQuery}%`);
    }

    const {data, error} = await query

    if(error){
        console.error("error fetching jobs : ", error);
        return null;
    }
    return data;
}



export async function saveJob (token, {alreadySaved}, saveData){
    const supabase = await supabaseClient(token);
    if(alreadySaved){
        const {data, error:deleteError} = await supabase
        .from("saved_job")
        .delete()
        .eq("job_id", saveData.job_id);

        if(deleteError){
            console.error("error Deleting Saved Job : ", deleteError);
            return null;
        }
        return data;
    }
    else{
        const {data, error:insertError} = await supabase
        .from("saved_job")
        .insert([saveData])
        .select()

        if(insertError){
            console.error("error inserting saved jobs : ", insertError);
            return null;
        }
    }
    


    return data;
}

export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select(
      "*, company: companies(name,logo_url), applications: applications(*)"
    )
    .eq("id", job_id)
    .single();

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Job:", error);
    return null;
  }

  return data;
}




export async function updateHiringStatus(token, { job_id }, isOpen) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
      .from("jobs")
      .update({ isOpen })
      .eq("id", job_id)
      .select();
  
    if (error) {
      console.error("Error Updating Hiring Status:", error);
      return null;
    }
  
    return data;
  }


export async function addNewJob(token ,_, jobData) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
      .from("jobs")
      .insert([jobData])
      .select();
  
    if (error) {
      console.error("Error Updating Hiring Status:", error);
      return null;
    }
  
    return data;
  }
export async function getSavedJobs(token,_, jobData) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
      .from("saved_job")
      .select("*,job:jobs(*,company:companies(name,logo_url))");
  
    if (error) {
      console.error("Error fetching saved jobs:", error);
      return null;
    }
  
    return data;
  }

  export async function getMyJobs(token, { recruiter_id }) {
    const supabase = await supabaseClient(token);
  
    const { data, error } = await supabase
      .from("jobs")
      .select("*, company: companies(name,logo_url)")
      .eq("recruiter_id", recruiter_id);
  
    if (error) {
      console.error("Error fetching Jobs:", error);
      return null;
    }
  
    return data;
  }
  
  export async function deleteJob(token, { job_id }) {
    const supabase = await supabaseClient(token);
  
    const { data, error: deleteError } = await supabase
      .from("jobs")
      .delete()
      .eq("id", job_id)
      .select();
  
    if (deleteError) {
      console.error("Error deleting job:", deleteError);
      return data;
    }
  
    return data;
  }
  
  // - post job
