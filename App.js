import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { useState } from "react";
import Transacciones from "./components/Transacciones";
import Item from "./components/Item";

export default function App() {
  const [transactionList, setTransactionList] = useState([]);
  const [balance, setBalance] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState();

  const handleEditMode = (state) => {
    setEditMode(state);
  }

  const ingreso = (importe) => {
    setBalance(parseInt(balance) + parseInt(importe));
  }

  const retirada = (importe) => {
    setBalance(parseInt(balance) - parseInt(importe));
  }

  const addProductHandler = (concepto, importe, fecha, tipo) => {
    if (concepto !== "") {
      setTransactionList(() => [
        ...transactionList,
        { key: Math.random().toString(), concepto, importe, fecha, tipo },
      ]);
    }
    setShowModal(false);
  };

  const deleteProductHandler = (transactionKey) => {
    if (transactionKey.tipo == "Ingreso") {
      setBalance(parseInt(balance) - parseInt(transactionKey.importe))
    } else {
      setBalance(parseInt(balance) + parseInt(transactionKey.importe))
    }
    
    setTransactionList((currentList) => {
      return currentList.filter(
        (transactionList) => transactionList.key !== transactionKey.key
      );
    });
  };

  const handleEditTransaction = (newTransaction, key) => {
    const idToEdit = key;
    const index = transactionList.findIndex((transaction) => transaction.key === idToEdit);
    setTransactionList((transactionList) => {
      return [...transactionList.slice(0, index), newTransaction, ...transactionList.slice(index + 1)];
    });
    setEditMode(false);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title={"Add"} onPress={() => setShowModal(true)} />
        <Text style={balance < 0 ? {color:"red"} : {color:"black"}}>Su balance: {balance} €</Text>
      </View>
      <Transacciones
        addProductHandler={addProductHandler}
        addMode={showModal}
        ingreso={ingreso}
        retirada={retirada}
        editMode={editMode}
        handleEditTransaction = {handleEditTransaction}
        editData={editData}
      />
      <View style={styles.listItem}>
        <FlatList
          data={transactionList}
          renderItem={(itemData) => (
            <Item
              value={itemData.item}
              onDelete={() => deleteProductHandler(itemData.item)}
              setShowModal={setShowModal}
              handleEditMode={handleEditMode}
              setEditData={setEditData}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: "80%",
    marginTop: 40,
  },
  header: {
    flexDirection: "row"
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
