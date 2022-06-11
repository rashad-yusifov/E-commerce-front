import React from 'react';
import { Card, Icon, Image, Button, MenuItem } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { trashMovie } from '../actions/movies';
import { connect } from 'react-redux';
import { confirm } from "react-confirm-box";
import { ToastContainer, toast } from 'react-toastify';

function MovieCard(props) {


  const trashMovie = async (id) => {
    const result = await confirm("Do you want remove Film ?");
    if (result) {
      props.trashMovie(id).then(res => {
        toast.success("Has been removed");
      });
      return;
    }
  }

  return (
    <>
      <ToastContainer />
      <Card>
        <Image src={props.movie.cover} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{props.movie.title}</Card.Header>
          <Card.Description>
            {props.movie.desc}
          </Card.Description>
          <Card.Content extra>

            <MenuItem as={NavLink} to={"/control-movie/" + props.movie._id}>
              <Button animated>
                <Button.Content visible>View</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button>
            </MenuItem>




            <Button animated='vertical' onClick={() => trashMovie(props.movie._id)}>
              <Button.Content hidden>Trash</Button.Content>
              <Button.Content visible>
                <Icon name='trash' />
              </Button.Content>
            </Button>



          </Card.Content>
        </Card.Content>
      </Card>
    </>
  );

}


const mapStateToProps = (state) => {
  return state;
}


const mapDispatchToProps = {
  trashMovie
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);


