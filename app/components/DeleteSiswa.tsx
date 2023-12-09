"use client"

import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Siswa = {
    id: string;
    nama: string;
    jurusan: string;
}

const DeleteSiswa = ({ siswa }: { siswa: Siswa }) => {

    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()

    const handleModal = () => {
        setIsOpen(!isOpen)
    }


    const handleDelete = async (id: string) => {
        await axios.delete(`/api/siswa/${id}`)
        router.refresh()
        await axios.get(`/api/siswa`)
        setIsOpen(false)
    }

    return (
        <div>
            <button onClick={handleModal} className="btn btn-error btn-sm mb-5 text-white font-semibold">delete</button>
            <div className={isOpen ? 'modal modal-open ' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">are you sure to delete {siswa.nama}</h3>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleModal}>cancel</button>
                        <button type="button" onClick={() => { handleDelete(siswa.id) }} className="btn text-white btn-success">yes</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DeleteSiswa