import React from 'react';
import { Calculator } from './components/Calculator';
import { ErrorSnackbar } from './components/error_snack_bar/ErrorSnackBar';

function App() {
  return (
    <>
      <ErrorSnackbar />
      <Calculator />
    </>

  );
}

export default App;
