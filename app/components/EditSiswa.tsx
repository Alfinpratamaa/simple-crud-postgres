"use client"
import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Siswa = {
    id: string;
    nama: string;
    jurusan: string;
}

const EditSiswa = ({ siswa }: { siswa: Siswa }) => {
    const [name, setName] = useState(siswa.nama)
    const [id, setId] = useState(siswa.id)
    const [jurusan, setJurusan] = useState(siswa.jurusan)


    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()

    const handleModal = () => {
        setIsOpen(!isOpen)


    }

    const handleEdit = async (e: SyntheticEvent) => {
        e.preventDefault()
        await axios.patch(`/api/siswa/${siswa.id}`, {
            id: id,
            nama: name,
            jurusan: jurusan

        })
        router.refresh()
        setIsOpen(false)
    }

    return (
        <div>
            <button onClick={handleModal} className="btn btn-success btn-sm mb-5 text-white font-semibold">Edit</button>
            <div className={isOpen ? 'modal modal-open ' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Siswa</h3>
                    <form onSubmit={handleEdit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">id siswa</label>
                            <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="id siswa" className="input input-bordered" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Nama Siswa</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="nama siswa" className="input input-bordered" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Jurusan</label>
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

export default EditSiswa