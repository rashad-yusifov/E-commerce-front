import React from "react";
import { useEffect } from "react";
import { fetchMovies } from "../../actions/movies";
import {connect} from 'react-redux';
import { Container, Grid } from "semantic-ui-react";
import CardMovie from '../../components/MovieCard';
import HashLoader from "react-spinners/HashLoader";
import styled from 'styled-components';

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  padding-bottom: 80px;
  width: 100%;
  position: relative;
`

function Home({fetchMovies, movies}) {

    useEffect(() => {
      fetchMovies();
    }, []);

    return (
      <>
        <Container style={{ marginTop: "7em", marginBottom: "7em" }}>
            <Grid relaxed columns={3}>
              {
                 !movies.fetching ? movies.movies.map((item, index) => {
                  return (
                    <Grid.Column key={index}>
                        <CardMovie movie={item}/>
                    </Grid.Column>
                  );
                }) : <Center>
                    <HashLoader size={50} color="#ea0037"/>
                </Center>
              }
            </Grid>
        </Container>
      </>
    );
}


const mapStateToProps = (state) => {
  return state;
}


const mapDispatchToProps = {
  fetchMovies
}



export default connect(mapStateToProps, mapDispatchToProps)(Home);
