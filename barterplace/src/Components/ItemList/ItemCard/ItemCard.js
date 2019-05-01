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
import blue from "@material-ui/core/colors/blue";
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
  },
  favoriteIcon: {
    color: red[500]
  },
  shareIcon: {
    color: blue[500]
  }
});

class ItemCard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      expanded: false,
      anchorEl: null,
      editItemModel: false,
      contactModal: false,
      userEmail: "",
      userPhone: ""
    };
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
  toggleContactModel = res => {
    this.setState({
      contactModal: !this.state.contactModal,
      userEmail: res.username,
      userPhone: res.phone
    });
  };
  contactUser = () => {
    const auth = sessionStorage.getItem("barterAuth");
    fetch(
      `https://hunterbarter.herokuapp.com/user/${this.props.item.username}`,
      {
        credentials: "same-origin",
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: auth }
      }
    )
      .then(response => response.json())
      .then(res => this.toggleContactModel(res));
  };
  addToWishlist = () => {
    const auth = sessionStorage.getItem("barterAuth");
    fetch(
        `https://hunterbarter.herokuapp.com/favorite/set/${this.props.item.id}`,
        {
          credentials: "same-origin",
          method: "post",
          headers: { "Content-Type": "application/json", Authorization: auth }
        }
    )
        .then(response => response.json())
    //.then(res => this.props.close());
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
                      <div>
                        <MenuItem key={"contact"} onClick={this.contactUser}>
                          Contact
                        </MenuItem>
                        <MenuItem key={"favorite"} onClick={this.addToWishlist}>
                          Add to Wishlist
                        </MenuItem>
                      </div>
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
              <FavoriteIcon className={classes.favoriteIcon} />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon className={classes.shareIcon} />
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
              <Typography paragraph>What should we put here?</Typography>
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
              <Typography paragraph>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem
              </Typography>
              <Typography>fin</Typography>
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
        <Modal open={this.state.contactModal} onClose={this.toggleContactModel}>
          <DialogContent>
            <div className="contactModal">
              <h1>{this.state.userEmail}</h1>
              <h1>{this.state.userPhone}</h1>
            </div>
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
