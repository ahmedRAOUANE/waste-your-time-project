import { Button, TextField } from '@mui/material'
import React from 'react'

const Input = ({ type, placeholder }) => {
    return (
        <form style={{ flex: 1, gap: '10px', display: "flex" }}>
            <TextField type={type} placeholder={placeholder} sx={{ flex: 1 }} />
            <Button variant='contained' type='submit'>{type}</Button>
        </form>
    )
}

export default Input