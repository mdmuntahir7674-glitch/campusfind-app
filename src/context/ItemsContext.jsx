import { createContext, useContext, useState, useEffect } from 'react'
import { SEED_ITEMS } from '../data/seedData'

const ItemsContext = createContext(null)

const STORAGE_KEY = 'campus_find_items'
const MESSAGES_KEY = 'campus_find_messages'

export function ItemsProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch (err) {
      console.error('Error reading localStorage items:', err)
    }
    return SEED_ITEMS
  })

  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem(MESSAGES_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (err) {
      console.error('Error reading localStorage messages:', err)
    }
    return []
  })

  // Synchronize items with LocalStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (err) {
      console.error('Failed to sync items to localStorage:', err)
    }
  }, [items])

  // Synchronize messages with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages))
    } catch (err) {
      console.error('Failed to sync messages to localStorage:', err)
    }
  }, [messages])

  // Add a new item report
  const addItem = (newItemData) => {
    const id = `item-${Date.now()}`
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString().split('T')[0]
    const formattedTime = currentDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })

    const newItem = {
      id,
      date: formattedDate,
      time: formattedTime,
      status: 'open',
      isUserReport: true,
      ...newItemData,
    }

    setItems((prev) => [newItem, ...prev])
    return newItem
  }

  // Update existing item metadata or status
  const updateItem = (id, updatedFields) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    )
  }

  // Delete an item by ID
  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Toggle item status between 'open', 'claimed', 'resolved'
  const setItemStatus = (id, status) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    )
  }

  // Send a demo contact/claim inquiry to an item owner
  const sendInquiry = (itemId, messageData) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      itemId,
      timestamp: new Date().toISOString(),
      ...messageData,
    }
    setMessages((prev) => [newMsg, ...prev])
    return newMsg
  }

  // Reset data back to initial seed data
  const resetToSeed = () => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(MESSAGES_KEY)
    setItems(SEED_ITEMS)
    setMessages([])
  }

  // Helper selectors
  const getItemById = (id) => items.find((item) => item.id === id)

  const userReports = items.filter((item) => item.isUserReport)
  const lostItems = items.filter((item) => item.type === 'lost')
  const foundItems = items.filter((item) => item.type === 'found')

  const stats = {
    total: items.length,
    lost: lostItems.length,
    found: foundItems.length,
    resolved: items.filter((item) => item.status === 'resolved').length,
    activeClaims: items.filter((item) => item.status === 'claimed').length,
  }

  return (
    <ItemsContext.Provider
      value={{
        items,
        messages,
        stats,
        userReports,
        lostItems,
        foundItems,
        addItem,
        updateItem,
        deleteItem,
        setItemStatus,
        sendInquiry,
        getItemById,
        resetToSeed,
      }}
    >
      {children}
    </ItemsContext.Provider>
  )
}

export function useItems() {
  const context = useContext(ItemsContext)
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider')
  }
  return context
}