export default async function page() {
    async function postAPI(){
        const res = await fetch(`${process.env.LOCAL}/api/post`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify ({
                serverName: "Server"
            })
        })
        const data = await res.json()
        return {data};
    }

    const {data} = await postAPI()
  return (
    <div className="text-white">
      {data ? <pre>{data.message}</pre> : "Loading..."}
    </div>
  )
}
