import React, { useRef, useState, useCallback, useEffect } from 'react'
import Card from './Card'
import AddCardForm from './AddCardForm'
import Popup from './Popup'
import { FaPlus } from 'react-icons/fa'

function Foreground() {
    const ref = useRef(null)
    const [cards, setCards] = useState([
        {id: 1, desc: "Example text 1", filesize:".8mb", close: false, tag:{isOpen: true, tagTitle: "Card 1", tagColor: "green"}, file: null},
        {id: 2, desc: "Hellow Sunshine, hope you're doing good", filesize:".8mb", close: false, tag:{isOpen: true, tagTitle: "Card 2", tagColor: "blue"}, file: null},
        {id: 3, desc: "Example text 3", filesize:".8mb", close: false, tag:{isOpen: true, tagTitle: "Card 3", tagColor: "green"}, file: null}
    ])
    const [showPopup, setShowPopup] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const [isButtonExpanded, setIsButtonExpanded] = useState(false)

    const addCard = useCallback((newCard) => {
        setCards(prevCards => [...prevCards, { ...newCard, id: Date.now(), file: null }])
        setShowAddForm(false)
    }, [])

    const deleteCard = useCallback((id) => {
        setCards(prevCards => prevCards.filter(card => card.id !== id))
    }, [])

    const editCard = useCallback((id, updatedCard) => {
        setCards(prevCards => prevCards.map(card => 
            card.id === id ? { ...card, ...updatedCard } : card
        ))
    }, [])

    const handleFileUpload = useCallback((id, file) => {
        setCards(prevCards => prevCards.map(card => 
            card.id === id ? { ...card, file: file, filesize: `${(file.size / 1024 / 1024).toFixed(2)}MB` } : card
        ))
        setShowPopup(true)
    }, [])

    const handleMouseMove = useCallback((event) => {
        const button = document.getElementById('addButton')
        if (button) {
            const rect = button.getBoundingClientRect()
            const distance = Math.sqrt(
                Math.pow(event.clientX - (rect.left + rect.width / 2), 2) +
                Math.pow(event.clientY - (rect.top + rect.height / 2), 2)
            )
            setIsButtonExpanded(distance < 100) // Adjust this value to change the proximity threshold
        }
    }, [])

    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [showPopup])

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [handleMouseMove])

    return (
        <>
            <div ref={ref} className='fixed z-[3] w-full h-full flex gap-5 flex-wrap p-5'>
                {cards.map((item) => (
                    <Card 
                        key={item.id} 
                        data={item} 
                        reference={ref}
                        onDelete={deleteCard}
                        onEdit={editCard}
                        onFileUpload={handleFileUpload}
                    />
                ))}
            </div>
            <button 
                id="addButton"
                onClick={() => setShowAddForm(true)} 
                className={`fixed top-5 right-5 z-[4] bg-blue-500 text-white h-12 rounded-full flex items-center justify-center shadow-lg ${isButtonExpanded ? 'w-24' : 'w-12'}`}
            >
                {isButtonExpanded ? (
                    <span>Upload</span>
                ) : (
                    <FaPlus />
                )}
            </button>
            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[5]">
                    <div className="bg-zinc-800 p-5 rounded-lg">
                        <AddCardForm onAdd={addCard} onClose={() => setShowAddForm(false)} />
                    </div>
                </div>
            )}
            <Popup message="File uploaded successfully!" isVisible={showPopup} />
        </>
    )
}

export default Foreground