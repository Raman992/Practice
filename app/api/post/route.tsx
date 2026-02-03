import { NextResponse } from "next/server";

export async function POST(req:Request) {
    const data = await req.json();
    const {serverName} = data;
    
    return NextResponse.json({message: ` hello ${serverName}`})
}