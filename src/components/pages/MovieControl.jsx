import React, { useEffect, useState } from "react";
import { Button, Container, Checkbox, Form } from "semantic-ui-react";
import { Formik, ErrorMessage } from "formik";
import { schemaOfMovie } from '../../helpers/index';
import styled from "styled-components";
import { connect } from "react-redux";
import { addMovie, getMovieById, editMovie} from "../../actions/movies";
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ImageBox = styled.div`
   width: 100%;
   position: relative;
   height: 400px;
   padding: 10px;
   border-radius: 10px;
   overflow: hidden;
   background-color: #1B1C1D; 
   border: 4px solid #CF0045;
   margin-top: 40px;
`;

const FitImg = styled.img`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function NewMovie(props) {


  let navigator = useNavigate();
  const { id } = useParams();
  const [isNew, setIsNew] = useState(id ? false : true);

  

  const [initialValues, setInitialValus] = useState({
    title: "",
    desc: "",
    cover: ""
  });



  useEffect(() => {

    let movies = props.movies.movies || [];
    let index = movies.findIndex(i => i._id == id);

    if (id) {
      if (index > -1) {
        setInitialValus({
          cover: movies[index].cover,
          title: movies[index].title,
          desc: movies[index].desc,
        });
      }
      else {
        props.getMovieById(id);
      }
      setIsNew(false);
    }
    else{
      setIsNew(true);
    }


  }, []);


  useEffect(() => {
    if (props.movies.movie) {
      setInitialValus({
        cover: props.movies.movie.cover,
        title: props.movies.movie.title,
        desc: props.movies.movie.desc
      })
    }
  }, [props]);





  return (

    <Container text style={{ marginTop: "7em", marginBottom: "7em" }}>
      <h1 style={{ marginBottom: "2rem" }}>
        {isNew ? 'Add new movie' : "Edit movie"}
      </h1>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={schemaOfMovie}
        onSubmit={(values) => {
          if (isNew) {
            props.addMovie(values).then(res => {
              toast.success("Added");
              navigator('/');
            }).catch(err => {
              let message = err.response.message || "Somethings went wrong";
              toast.error(message);
            })
          }
          else {
            props.editMovie({
              id,
              movie: values
            }).then(res => {
              toast.success("Has been updated");
            })
          }
        }}
      >
        {({ handleSubmit, isSubmitting, handleChange, errors, touched, handleBlur, values }) => {
          return (
            <>
              <ToastContainer />
              <Form loading={props.movies.fetching}>
                <Form.Field error={!!errors.title && touched.title}>
                  <label>Title</label>
                  <input onBlur={handleBlur} value={values.title} onChange={handleChange} placeholder="Title" name="title" />
                  {touched.title ? <ErrorMessage name="title" /> : <></>}
                </Form.Field>
                <Form.Field error={!!errors.desc && touched.desc}>
                  <label>Description</label>
                  <input onBlur={handleBlur} value={values.desc} onChange={handleChange} placeholder="description" name="desc" />
                  {touched.desc ? <ErrorMessage name="desc" /> : <></>}
                </Form.Field>
                <Form.Field error={!!errors.cover && touched.cover}>
                  <label>Cover</label>
                  <input onBlur={handleBlur} value={values.cover} onChange={handleChange} placeholder="Cover" name="cover" />
                  {touched.cover ? <ErrorMessage name="cover" /> : <></>}
                </Form.Field>
                <Button onClick={handleSubmit} disabled={Object.keys(errors).length > 0 || (Object.keys(touched).length < 1 && isNew)} type="submit">Submit</Button>
              </Form>
              {
                values.cover ? <ImageBox>
                  <FitImg src={values.cover} />
                </ImageBox> : <></>
              }
            </>

          );
        }}
      </Formik>
    </Container>
  );
}


const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = {
  addMovie,
  getMovieById,
  editMovie
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMovie);
