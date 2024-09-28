import React, { useState } from 'react'
import { IoClose } from "react-icons/io5"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

function AddCardForm({ onAdd, onClose }) {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [tagColor, setTagColor] = useState('green')
    const [file, setFile] = useState(null)
    const [dueDate, setDueDate] = useState(null)
    const [priority, setPriority] = useState('medium')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title.trim() || !desc.trim()) return
        onAdd({
            title,
            desc,
            filesize: file ? `${(file.size / 1024 / 1024).toFixed(2)}MB` : "0mb",
            close: false,
            tag: { isOpen: true, tagTitle: title, tagColor: tagColor },
            file: file,
            dueDate: dueDate,
            priority: priority
        })
        onClose()
    }

    return (
        <form onSubmit={handleSubmit} className="w-[400px] bg-zinc-800 rounded-xl p-8 relative shadow-2xl">
            <button 
                type="button" 
                onClick={onClose} 
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
            >
                <IoClose size="1.5rem" />
            </button>
            <h2 className="text-white text-2xl font-bold mb-6">Add New Card</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-zinc-400 text-sm font-medium mb-1">Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter card title"
                        className="w-full p-2 bg-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-zinc-400 text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value.slice(0, 200))}
                        placeholder="Enter card description"
                        className="w-full p-2 bg-zinc-700 text-white rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-zinc-400 text-xs mt-1">{desc.length}/200 characters</p>
                </div>
                <div>
                    <label className="block text-zinc-400 text-sm font-medium mb-1">Tag Color</label>
                    <select
                        value={tagColor}
                        onChange={(e) => setTagColor(e.target.value)}
                        className="w-full p-2 bg-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                    </select>
                </div>
                <div>
                    <label className="block text-zinc-400 text-sm font-medium mb-1">Attachment</label>
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full p-2 bg-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-zinc-400 text-sm font-medium mb-1">Due Date</label>
                    <DatePicker 
                        selected={dueDate} 
                        onChange={(date) => setDueDate(date)} 
                        placeholderText="Select due date"
                        className="w-full p-2 bg-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-zinc-400 text-sm font-medium mb-1">Priority</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full p-2 bg-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                </div>
            </div>
            <button 
                type="submit" 
                className="w-full bg-blue-500 text-white p-2 rounded-md mt-6 hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
            >
                Add Card
            </button>
        </form>
    )
}

export default AddCardForm