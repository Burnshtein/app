// shared/ui/Input/Input.tsx
import React from 'react'

type InputProps = {
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
  className?: string
}

export function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className = ''
}: InputProps) {
  const styles = {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box' as const,
    marginBottom: '12px'
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      style={styles}
      className={className}
    />
  )
}