import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import DialogContent from "@material-ui/core/DialogContent";

import EditItem from "./EditItem";
const styles = theme => ({
  card: {
    maxWidth: "350px",
    minWidth: "350px",
    minHeight: "450px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class ItemCard extends React.Component {
  constructor(props) {
    super();
    this.state = { expanded: false, anchorEl: null, editItemModel: false };
  }
  handleExpandClick = () => {
    console.log(this.props.item);
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  deleteItem = () => {
    const auth = sessionStorage.getItem("barterAuth");
    fetch(
      `https://hunterbarter.herokuapp.com/list/remove/${this.props.item.id}`,
      {
        credentials: "same-origin",
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: auth }
      }
    ).then(res => this.props.rerender());
  };
  toggleEditItemModel = () => {
    this.setState({
      editItemModel: !this.state.editItemModel
    });
  };
  render() {
    const { classes } = this.props;
    console.log(this.props.item);
    const open = Boolean(this.state.anchorEl);

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Profile" className={classes.avatar}>
                {this.props.item.username[0].toUpperCase()}
              </Avatar>
            }
            action={
              <div>
                <IconButton onClick={this.handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={this.state.anchorEl}
                  open={open}
                  onClose={this.handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: 48 * 4.5,
                      width: 200
                    }
                  }}
                >
                  {sessionStorage.getItem("user") ===
                  this.props.item.username ? (
                    <div>
                      <MenuItem key={"edit"} onClick={this.toggleEditItemModel}>
                        Edit
                      </MenuItem>
                      <MenuItem key={"delete"} onClick={this.deleteItem}>
                        Delete
                      </MenuItem>
                    </div>
                  ) : (
                    <MenuItem key={"contact"}>Contact</MenuItem>
                  )}
                  ))}
                </Menu>
              </div>
            }
            title={this.props.item.name}
            subheader={this.props.item.date}
          />
          <CardMedia
            className={classes.media}
            image={this.props.item.image.src}
            title={this.props.item.name}
          />

          <CardContent>
            <Typography component="h3">
              Condtion: {this.props.item.condition}
            </Typography>
            <Typography component="p">{this.props.item.description}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron
                and set aside for 10 minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep
                skillet over medium-high heat. Add chicken, shrimp and chorizo,
                and cook, stirring occasionally until lightly browned, 6 to 8
                minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves,
                garlic, tomatoes, onion, salt and pepper, and cook, stirring
                often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a
                boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes
                and peppers, and cook without stirring, until most of the liquid
                is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
                reserved shrimp and mussels, tucking them down into the rice,
                and cook again without stirring, until mussels have opened and
                rice is just tender, 5 to 7 minutes more. (Discard any mussels
                that don’t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then
                serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
        <Modal
          open={this.state.editItemModel}
          onClose={this.toggleEditItemModel}
        >
          <DialogContent>
            <EditItem
              close={this.toggleEditItemModel}
              itemID={this.props.item.id}
            />
          </DialogContent>
        </Modal>
      </div>
    );
  }
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemCard);
