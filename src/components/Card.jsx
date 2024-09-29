import React, { useState, useMemo, useRef } from 'react'
import { FaRegFileAlt, FaEdit, FaPaperclip } from "react-icons/fa";
import { IoClose } from "react-icons/io5"
import { motion } from "framer-motion"

function Card({data, reference, onDelete, onEdit, onFileUpload}) {
	const [isEditing, setIsEditing] = useState(false)
	const [editedDesc, setEditedDesc] = useState(data.desc)
	const [taskType, setTaskType] = useState(data.taskType || '')
	const [priority, setPriority] = useState(data.priority || 'none')
	const [tagColor, setTagColor] = useState(data.tag.tagColor || 'green') // Add this line
	const fileInputRef = useRef(null)

	const handleEdit = () => {
		onEdit(data.id, { desc: editedDesc, taskType, priority, tagColor }) // Include tagColor
		setIsEditing(false)
	}

	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			onFileUpload(data.id, file);
		}
	}

	const triggerFileUpload = () => {
		fileInputRef.current.click();
	}

	return useMemo(() => (
		<motion.div 
			drag 
			dragConstraints={reference} 
			whileHover={{scale: 1.05}} 
			dragElastic={0.2} 
			dragTransition={{
				bounceStiffness: 300, 
				bounceDamping: 20
			}}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				type: "spring",
				stiffness: 100,
				damping: 15
			}}
			className='flex-shrink-0 relative w-60 h-72 bg-zinc-900/90 rounded-[45px] text-white py-10 px-8 overflow-hidden'
		>
			<FaRegFileAlt />
			{isEditing ? (
				<>
					<input 
						value={editedDesc}
						onChange={(e) => setEditedDesc(e.target.value)}
						className="mt-5 w-full bg-transparent border-b border-white"
					/>
					<select
						value={taskType}
						onChange={(e) => setTaskType(e.target.value)}
						className="mt-2 w-full bg-zinc-800 text-white rounded p-1"
					>
						<option value="">Select Task Type</option>
						<option value="tracker">Tracker</option>
						<option value="reminder">Reminder</option>
						<option value="fileholder">File Holder</option>
						<option value="project">Project</option>
						<option value="goal">Goal</option>
						<option value="checklist">Checklist</option>
					</select>
					<select
						value={priority}
						onChange={(e) => setPriority(e.target.value)}
						className="mt-2 w-full bg-zinc-800 text-white rounded p-1"
					>
						<option value="none">None</option>
						<option value="low">Low Priority</option>
						<option value="medium">Medium Priority</option>
						<option value="high">High Priority</option>
					</select>
					<select
						value={tagColor}
						onChange={(e) => setTagColor(e.target.value)}
						className="mt-2 w-full bg-zinc-800 text-white rounded p-1"
					>
						<option value="green">Green</option>
						<option value="blue">Blue</option>
						<option value="red">Red</option>
						<option value="yellow">Yellow</option>
					</select>
					<button onClick={handleEdit} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">
						Save
					</button>
				</>
			) : (
				<>
					<p className='text-sm leading-tight mt-5 font-semibold'>{data.desc}</p>
					<p className='text-xs mt-2 text-gray-400'>Type: {data.taskType || 'Not specified'}</p>
					<p className='text-xs mt-1 text-gray-400'>Priority: {data.priority || 'None'}</p>
				</>
			)}
			{data.file && (
				<div className="mt-2 text-xs">
					<FaPaperclip className="inline mr-1" />
					{data.file.name}
				</div>
			)}
			<div className='footer absolute bottom-0 w-full left-0'>
				<div className='flex items-center justify-between py-3 px-8 mb-3'>
					<h5>{data.filesize}</h5>
					<div className="flex">
						<label className='w-7 h-7 bg-zinc-600 rounded-full justify-center flex items-center mr-2 cursor-pointer'>
							<input 
								type="file" 
								className="hidden" 
								onChange={handleFileUpload}
							/>
							<FaPaperclip size=".9rem" color="#fff"/>
						</label>
						<span className='w-7 h-7 bg-zinc-600 rounded-full justify-center flex items-center mr-2 cursor-pointer' onClick={() => setIsEditing(!isEditing)}>
							<FaEdit size=".9rem" color="#fff"/>
						</span>
						<span className='w-7 h-7 bg-zinc-600 rounded-full justify-center flex items-center cursor-pointer' onClick={() => onDelete(data.id)}>
							<IoClose/>
						</span>
					</div>
				</div>
				{data.tag.isOpen && (
					<div 
						className={`tag w-full h-10 bg-${data.tag.tagColor}-500 flex items-center justify-center cursor-pointer`}
						onClick={triggerFileUpload}
					>
						<h3 className='text-sm font-sf-pro-display'>{data.tag.tagTitle}</h3>
					</div> 
				)}
			</div>
			<input 
				type="file" 
				ref={fileInputRef}
				className="hidden" 
				onChange={handleFileUpload}
			/>
		</motion.div>
	), [data, reference, isEditing, editedDesc, taskType, priority, tagColor, onDelete, onEdit, onFileUpload])
}

export default Card