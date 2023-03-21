import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import formatDate from "../../utils/dateFormater";
import teste from "../../assets/eja.jpeg";

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
    color: "grey",
  },
  subtitle: {
    fontSize: 13,
    marginLeft: 12,
  },
  text: {
    margin: 12,
    fontSize: 13,
    textAlign: "justify",
  },
  image: {
    marginHorizontal: 12,
    width: "500px",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  delivery: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
});

// Create Document Component
function MyPDF() {
  const { idUser } = useParams();
  const [posts, setPosts] = useState([]);
  console.log("idUser", idUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      if (idUser) {
        const response = await api.get(`/posts/unprotect/${idUser}`);
        setPosts(response.data);
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      {!isLoading && (
        <PDFViewer className="h-screen">
          <Document>
            {posts.map((post) => {
              return (
                <Page style={styles.body} key={post._id}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Image style={{ width: "60px" }} src={"/eja.jpeg"} />
                    <Image style={{ width: "60px" }} src={"/jopa.jpeg"} />
                  </View>
                  <View>
                    <Text style={styles.header} fixed>
                      EJA - Conectando Saberes 2023
                    </Text>
                    <Text style={styles.title}>Etapa: {post.stage}</Text>
                    <Text style={styles.title}>Título: {post.title}</Text>
                    <Text style={styles.author}>{post.user.name}</Text>

                    <Text style={styles.subtitle}>Temática: {post.theme}</Text>

                    <Text style={styles.text}>{post.description}</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {post.photos?.map((photo, i) => {
                      return (
                        <div key={photo + i}>
                          <Text
                            style={{
                              marginLeft: "12px",
                              fontSize: "10px",
                              marginHorizontal: 12,
                            }}
                          >
                            Anexo {i + 1}
                          </Text>
                          <Image
                            style={styles.image}
                            src={{
                              uri: photo,
                              method: "GET",
                              headers: { "Cache-Control": "no-cache" },
                              body: "",
                            }}
                          />
                        </div>
                      );
                    })}
                  </View>

                  <Text style={styles.delivery}>
                    Entregue dia {formatDate(post.createdAt)}
                  </Text>
                  <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) =>
                      `${pageNumber} / ${totalPages}`
                    }
                    fixed
                  />
                </Page>
              );
            })}
          </Document>
        </PDFViewer>
      )}
    </>
  );
}

export default MyPDF;
