"use client"
import React from 'react'
import AddSiswa from '../components/AddSiswa'
import { PrismaClient } from '@prisma/client'
import DeleteSiswa from '../components/DeleteSiswa'
import EditSiswa from '../components/EditSiswa'

const prisma = new PrismaClient()

const getSiswa = async () => {
    const res = await prisma.siswa.findMany({
        select: {
            id: true,
            nama: true,
            jurusan: true,
        }
    })
    return res
}

const Student = async () => {

    const students = await getSiswa()
    return (
        <div className='w-full px-20 py-10'>
            <AddSiswa />
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead className='bg-slate-200'>
                        <tr>
                            <th>#</th>
                            <th>🇮d</th>
                            <th>nama siswa</th>
                            <th>jurusan</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr className='font-medium' key={student.id}>
                                <th>{index + 1}</th>
                                <th>{student.id}</th>
                                <td>{student.nama}</td>
                                <td>{student.jurusan}</td>
                                <td>
                                    <DeleteSiswa siswa={student} />
                                    <EditSiswa siswa={student} />
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </ div>
        </ div>
    )
}
export default Student
