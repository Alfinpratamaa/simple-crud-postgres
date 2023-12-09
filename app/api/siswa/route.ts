import { NextResponse } from "next/server";
import type { Siswa } from "@prisma/client";

import { PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: Request) =>{
    const body:Siswa =await req.json()

     if (!body.id || !body.nama || !body.jurusan) {
    return NextResponse.json({ error: "id, nama, jurusan harus diisi" }, { status: 400 })
  }
    const siswa = await prisma.siswa.create({
        data:{
            id: body.id,
            nama: body.nama,
            jurusan: body.jurusan
        }
    }) 
    return NextResponse.json(siswa, { status: 201 })
}

