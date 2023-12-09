import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Siswa } from "@prisma/client";

const prisma = new PrismaClient();

export const DELETE = async (req: Request,{params}:{params : {id:string}}) =>{
    const siswa = await prisma.siswa.delete({
        where:{
            id : params.id
        }
    })
    return NextResponse.json(siswa, { status: 200 })
}

export const PATCH = async (req: Request,{params}:{params : {id:string}}) =>{
    const body: Siswa = await req.json()
    const siswa = await prisma.siswa.update({
        where:{
            id: params.id
        },
        data:{
            id: body.id,
            nama: body.nama,
            jurusan: body.jurusan
        }
    })
    return NextResponse.json(siswa, { status: 200 })
}