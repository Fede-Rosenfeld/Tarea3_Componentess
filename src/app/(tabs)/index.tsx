import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Product = {
  id: string;
  title: string;
  price: string;
  description: string;
  image: number | { uri: string };
};

// Acá guardo todos los productos de la galería.
const products: Product[] = [
  {
    id: "1",
    title: "Cámara instantánea",
    price: "$ 89.900",
    description:
      "Una cámara compacta para convertir tus momentos favoritos en recuerdos físicos.",
    image: require("../../../assets/images/expo-logo.png"), // Imagen local
  },
  {
    id: "2",
    title: "Auriculares urbanos",
    price: "$ 64.500",
    description:
      "Sonido claro, diseño liviano y comodidad para acompañarte todos los días.",
    image: {
      uri: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900",
    }, // Imagen cargada desde internet
  },
  {
    id: "3",
    title: "Mochila de viaje",
    price: "$ 72.000",
    description:
      "Espacio y organización para moverte con todo lo necesario sin perder estilo.",
    image: {
      uri: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900",
    },
  },
  {
    id: "4",
    title: "Zapatillas clásicas",
    price: "$ 98.700",
    description:
      "Un modelo versátil con una silueta atemporal para usar en cualquier ocasión.",
    image: {
      uri: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900",
    },
  },
];

export default function Galeria() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [resizeMode, setResizeMode] = useState<"cover" | "contain" | "stretch">(
    "cover",
  );

  // Voy filtrando mientras se escribe en el buscador.
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  function toggleFavorite(id: string) {
    // Mantener apretado cambia el favorito.
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>COLECCIÓN 2026</Text>
        <Text style={styles.title}>Galería</Text>
        <Text style={styles.subtitle}>
          Elegí tus favoritos y descubrí cada detalle.
        </Text>
      </View>

      <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar por título..."
        placeholderTextColor="#8b817b"
      />

      {/* Muestro solamente los productos que coinciden con la búsqueda. */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(product) => product.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No encontramos productos con ese título.
          </Text>
        }
        renderItem={({ item }) => {
          const isFavorite = favorites.includes(item.id);

          return (
            <Pressable
              style={({ pressed }) => [
                styles.product,
                pressed && styles.productPressed,
              ]}
              onPress={() => {
                // Al tocar un producto abro su detalle.
                setResizeMode("cover");
                setSelectedProduct(item);
              }}
              onLongPress={() => toggleFavorite(item.id)}
              delayLongPress={450}
            >
              <Image source={item.image} style={styles.thumbnail} />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
              <Text
                style={[styles.favorite, isFavorite && styles.favoriteActive]}
              >
                {isFavorite ? "★" : "☆"}
              </Text>
            </Pressable>
          );
        }}
      />

      <Modal
        visible={selectedProduct !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedProduct(null)}
      >
        <View style={styles.modalBackdrop}>
          {selectedProduct && (
            <View style={styles.modalCard}>
              <Image
                source={selectedProduct.image}
                style={styles.largeImage}
                resizeMode={resizeMode}
              />
              <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
              <Text style={styles.modalDescription}>
                {selectedProduct.description}
              </Text>
              <Text style={styles.modeLabel}>Modo de imagen</Text>
              {/* Estos botones cambian el resizeMode de la imagen. */}
              <View style={styles.modeRow}>
                {(["cover", "contain", "stretch"] as const).map((mode) => (
                  <Pressable
                    key={mode}
                    style={[
                      styles.modeButton,
                      resizeMode === mode && styles.modeButtonSelected,
                    ]}
                    onPress={() => setResizeMode(mode)}
                  >
                    <Text
                      style={[
                        styles.modeText,
                        resizeMode === mode && styles.modeTextSelected,
                      ]}
                    >
                      {mode}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <Pressable
                style={styles.closeButton}
                onPress={() => setSelectedProduct(null)}
              >
                <Text style={styles.closeText}>Cerrar</Text>
              </Pressable>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#f7f2ed" },
  header: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 16 },
  eyebrow: {
    color: "#d96c4f",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  title: { color: "#302923", fontSize: 40, fontWeight: "800", marginTop: 5 },
  subtitle: { color: "#766b64", fontSize: 15, marginTop: 3 },
  input: {
    backgroundColor: "#fffdfa",
    borderColor: "#e4d9d0",
    borderRadius: 14,
    borderWidth: 1,
    color: "#302923",
    fontSize: 16,
    marginHorizontal: 22,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  list: { gap: 12, padding: 22, paddingTop: 18 },
  product: {
    alignItems: "center",
    backgroundColor: "#fffdfa",
    borderColor: "#eadfd7",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 94,
    padding: 10,
  },
  productPressed: { opacity: 0.72 },
  thumbnail: {
    backgroundColor: "#eee5de",
    borderRadius: 12,
    height: 74,
    width: 74,
  },
  productInfo: { flex: 1, paddingHorizontal: 14 },
  productTitle: { color: "#302923", fontSize: 17, fontWeight: "700" },
  price: { color: "#d96c4f", fontSize: 15, fontWeight: "700", marginTop: 8 },
  favorite: { color: "#c9bcb3", fontSize: 29, paddingHorizontal: 7 },
  favoriteActive: { color: "#d96c4f" },
  empty: {
    color: "#766b64",
    fontSize: 16,
    paddingTop: 30,
    textAlign: "center",
  },
  modalBackdrop: {
    backgroundColor: "rgba(48, 41, 35, 0.58)",
    flex: 1,
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#fffdfa",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 22,
  },
  largeImage: {
    backgroundColor: "#eee5de",
    borderRadius: 18,
    height: 240,
    width: "100%",
  },
  modalTitle: {
    color: "#302923",
    fontSize: 25,
    fontWeight: "800",
    marginTop: 18,
  },
  modalDescription: {
    color: "#766b64",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  modeLabel: {
    color: "#302923",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 20,
  },
  modeRow: { flexDirection: "row", gap: 8, marginTop: 10 },
  modeButton: {
    borderColor: "#dfd2c9",
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 10,
  },
  modeButtonSelected: { backgroundColor: "#d96c4f", borderColor: "#d96c4f" },
  modeText: { color: "#766b64", fontSize: 13, textAlign: "center" },
  modeTextSelected: { color: "#fffdfa", fontWeight: "700" },
  closeButton: {
    alignItems: "center",
    backgroundColor: "#302923",
    borderRadius: 12,
    marginTop: 20,
    paddingVertical: 14,
  },
  closeText: { color: "#fffdfa", fontSize: 16, fontWeight: "700" },
});
