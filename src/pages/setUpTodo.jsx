import Footer from "../components/common/footer";
import Header from "../components/common/header";
import SetToDoContainer from "../components/features/setToDo/SetToDoContainer";
import Layout from "../layout/layout";


function SetUpTodo() {

  return (
    <Layout>
      <Header />
        <SetToDoContainer />
      <Footer />
    </Layout>
  )
}

export default SetUpTodo;