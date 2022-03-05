import { useState } from "react";
import { StyleSheet, TextInput, Button, View, Modal } from "react-native";

const Transacciones = ({
  addProductHandler,
  addMode,
  ingreso,
  retirada,
  editMode,
  handleEditTransaction,
  editData,
}) => {
  const [concepto, setConcepto] = useState("");
  const [importe, setImporte] = useState("");

  const conceptoHandler = (productText) => {
    setConcepto(productText);
  };

  const importeHandler = (productText) => {
    setImporte(productText);
  };

  const validateIngreso = () => {
    addProductHandler(concepto, importe, Date(Date.now().toLocaleString()).slice(0, 15), "Ingreso");
    ingreso(importe);

    setConcepto("");
    setImporte("");
  };

  const validateRetirada = () => {
    addProductHandler(concepto, importe, Date(Date.now().toLocaleString()).slice(0, 15), "Retirada");
    retirada(importe);

    setConcepto("");
    setImporte("");
  };

  const validateEditIngreso = () => {
    handleEditTransaction(
      { key: editData.key, concepto, importe, fecha: Date(Date.now().toLocaleString()).slice(0, 15), tipo: "Ingreso" },
      editData.key
    );

    retirada(editData.importe);
    console.log(editData.importe)
    ingreso(importe);
    setConcepto("");
    setImporte("");
  };

  const validateEditRetirada = () => {
    ingreso(editData.importe);
    retirada(importe);
    handleEditTransaction(
      { key: editData.key, concepto, importe, fecha: Date(Date.now().toLocaleString()).slice(0, 15), tipo: "Retirada" },
      editData.key
    );

    setConcepto("");
    setImporte("");
  };

  if (!editMode) {
    return (
      <Modal visible={addMode}>
        <View style={styles.cabecera}>
          <TextInput
            style={styles.añadirTextoCabecera}
            placeholder="Concepto"
            onChangeText={conceptoHandler}
            value={concepto}
          />
          <TextInput
            style={styles.añadirTextoCabecera}
            placeholder="Importe"
            onChangeText={importeHandler}
            value={importe}
          />

          <Button
            style={styles.botonCabecera}
            title="Ingreso"
            onPress={validateIngreso}
          />

          <Button
            style={styles.botonCabecera}
            title="Retirada"
            onPress={validateRetirada}
          />
        </View>
      </Modal>
    );
  } else {
    return (
      <Modal visible={addMode}>
        <View style={styles.cabecera}>
          <TextInput
            style={styles.añadirTextoCabecera}
            placeholder="Concepto"
            onChangeText={conceptoHandler}
            value={concepto}
          />

          <TextInput
            style={styles.añadirTextoCabecera}
            placeholder="Importe"
            onChangeText={importeHandler}
            value={importe}
          />

          <Button
            style={styles.botonCabecera}
            title="Ingreso"
            onPress={validateEditIngreso}
          />

          <Button
            style={styles.botonCabecera}
            title="Retirada"
            onPress={validateEditRetirada}
          />
        </View>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  cabecera: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  añadirTextoCabecera: {
    width: "75%",
    borderBottomColor: "teal",
    borderBottomWidth: 1,
    borderWidth: 1,
    height: 40,
    margin: 25,
  },
  botonCabecera: { width: "25%" },
});

export default Transacciones;
