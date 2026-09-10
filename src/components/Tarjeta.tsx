import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  texto: string;
};

export default function Tarjeta({ texto }: Props) {
  const [activa, setActiva] = useState(false);

  return (
    <Pressable
      style={[styles.tarjeta, activa && styles.tarjetaActiva]}
      onPress={() => setActiva(!activa)}
    >
      <Text style={[styles.texto, activa && styles.textoActivo]}>{texto}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    height: 90,

    // centrado en ambos ejes
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "white",

    marginBottom: 12,
    padding: 15,

    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dddddd",
  },

  tarjetaActiva: {
    backgroundColor: "tomato",
    borderColor: "tomato",
  },

  texto: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },

  textoActivo: {
    color: "white",
  },
});
