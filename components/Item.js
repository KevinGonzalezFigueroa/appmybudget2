import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  Button,
} from "react-native";

const Item = ({
  value,
  onDelete,
  setShowModal,
  handleEditMode,
  setEditData,
}) => {
  return (
    <TouchableHighlight onPress={onDelete}>
      <View key={Math.random().toString()}>
        <Text style={styles.listItem}>
          Concepto: {value.concepto} {"\n\n"} Fecha: {value.fecha} {"\n\n"} Importe {value.importe} €
        </Text>
        <View style={{alignItems: 'center'}}>
          <Button
            title="Editar"
            onPress={() =>
              setShowModal(true) & handleEditMode(true) & setEditData(value)
            }
          ></Button>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: 100,
    width: "100%",
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    shadowColor: "#ccc",
    borderRadius: 5,
    margin: 0,
  },
});

export default Item;
