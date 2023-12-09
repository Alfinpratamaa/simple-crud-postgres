"use client"

import { useState, SyntheticEvent } from "react";
import type { Siswa } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddSiswa = () => {
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [jurusan, setJurusan] = useState('')

    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()

    const getDataSiswa = async () => {
        await axios.get(`/api/siswa`, {
            params: {
                id: id,
                name: name,
                jurusan: jurusan
            }
        })
        router.refresh()
        setIsOpen(false)
    }

    const handleModal = () => {
        setIsOpen(!isOpen)
    }
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        const data = {
            id: id,
            nama: name,
            jurusan: jurusan
        }
        console.log(data);
        try {

            await axios.post('/api/siswa', data);


            setName('');
            setJurusan('');
            setId('');
            getDataSiswa();
            router.refresh();
            setIsOpen(false);
        } catch (error) {
            console.error(error);
            alert('Error adding student');
        }
    }
    return (
        <div>
            <button onClick={handleModal} className="btn btn-neutral mb-5 text-white font-semibold">Add Task</button>
            <div className={isOpen ? 'modal modal-open ' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Siswa</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">id siswa</label>
                            <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="id siswa" className="input input-bordered" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Nama Siswa</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="nama siswa" className="input input-bordered" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product Brand</label>
                            <input type="text" value={jurusan} onChange={(e) => setJurusan(e.target.value)} placeholder="jurusan" className="input input-bordered" />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>cancel</button>
                            <button type="submit" className="btn text-white btn-success">save</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default AddSiswa