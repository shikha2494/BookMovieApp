import React, { useEffect } from 'react';
import Header from '../../common/header/Header'
import './Home.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link,useHistory } from 'react-router-dom';

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ListItemText from '@material-ui/core/ListItemText';

const styles = (theme) => ({
    typo:{
        color: theme.palette.primary.light
    },
    formControl:{
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240
    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Home(props){
    const [moviesList, setMoviesList] = React.useState([]);
    const [genresList, setGenresList] = React.useState([]);
    const [showgenre, setShowGenre] = React.useState([]);
    const [checked, setChecked] = React.useState(false);

    async function loadupcomingMovies() {
        const rawResponse = await  fetch(props.baseUrl + "/movies");
        const data = await rawResponse.json();
        setMoviesList(data.movies);
    }

    async function loadGenres(){
        const rawResponse = await  fetch(props.baseUrl + "/genres");
        const data = await rawResponse.json();
        setGenresList(data.genres);
    }

    useEffect(()=> {
        loadupcomingMovies();
        loadGenres();
    }, []);

    const genreChangeHandler = (event) => {
        console.log(event.target.value);
        setShowGenre(event.target.value);
    }

    const { classes } = props;

     return (
         <div>
                <Header baseUrl={props.baseUrl}/>
                <div className="heading">Upcoming Movies</div>
                <GridList cellHeight={250} style={{flexWrap: "nowrap",transform: 'translateZ(0)'}} cols={6}>
                    {moviesList.map((movie) => (
                    <GridListTile key={movie.id}>
                        <img src={movie.poster_url} alt={movie.title} />
                        <GridListTileBar
                            title={movie.title}
                            />
                    </GridListTile>
                    ))}
                </GridList>
                <div style={{display:"flex"}}>
                        <div style={{width:"76%", margin: "16px"}}>
                        <GridList cellHeight={350} cols={4}>
                            {moviesList.map((movie) => (
                            <GridListTile key={movie.id}>
                                <Link to={"/movie/"+movie.id}><img src={movie.poster_url} alt={movie.title} style={{width:"100%"}}/>
                                <GridListTileBar
                                    title={movie.title}
                                    subtitle={<span>Release Date: {movie.release_date}</span>}
                                    /></Link>
                            </GridListTile>
                            ))}
                        </GridList>
                        </div>
                        <div style={{width:"24%", margin: "16px"}}>
                            <Card className="cardStyle">
                            <CardContent>
                                <Typography variant="headline" component="h2" className={classes.typo}>
                                    FIND MOVIES BY:
                                </Typography>
                                <br />

                                <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="moviename">
                                Movie Name
                                </InputLabel>
                                <Input
                                    id="moviename"
                                />
                                <FormHelperText className="">
                                    <span className="red">Required</span>
                                </FormHelperText>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="genres">Genres</InputLabel>
                                <Select labelId="demo-mutiple-checkbox-label"
                                        id="demo-mutiple-checkbox"
                                        multiple
                                        value={showgenre}
                                        onChange={genreChangeHandler}
                                        input={<Input />}
                                        renderValue={(selected) => selected.join(', ')}
                                        MenuProps={MenuProps}>
                                    {genresList.map((gen) => (         
                                    <MenuItem key={gen.id} value={gen.genre}>
                                        <Checkbox checked={showgenre.indexOf(gen.id) > -1} />
                                        <ListItemText primary={gen.genre} />
                                    </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText className="">
                                    <span className="red">Required</span>
                                </FormHelperText>
                                </FormControl>
                                <br />
                                <br />
                                <Button
                                variant="contained"
                                onClick=""
                                color="primary"
                                >
                                Apply
                                </Button>
                            </CardContent>
                            </Card>
                        </div>
                </div>

            </div>
     );
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(Home);
