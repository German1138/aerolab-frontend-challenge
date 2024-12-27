export const container = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxWidth: '700px',
  margin: '0 10px',
};

export const textField = {
  backgroundColor: '#D4D4D4',
  borderRadius: '100px',
  border: '0px solid',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
  },
};
