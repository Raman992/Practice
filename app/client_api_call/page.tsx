"use client"

import { useEffect, useState } from "react"

export default function Page() {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function postAPI() {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serverName: "Client",
        }),
      })

      const result = await res.json()
      setData(result)
    }

    postAPI()
  }, [])

  return (
    <div className="text-white">
      {data ? <pre>{JSON.stringify(data)}</pre> : "Loading..."}
    </div>
  )
}
