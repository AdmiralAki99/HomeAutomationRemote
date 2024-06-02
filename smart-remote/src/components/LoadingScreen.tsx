import React from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface LoadingScreenProps {
    loading: boolean;
}

const loadingStyle = {
    width: 600,
    height: 1024,
    bgcolor: 'transparent',
    opacity: 0.5,
    overflow: 'scroll'
  };
  

class LoadingScreen extends React.Component<LoadingScreenProps> {
  state = {
    loading: false,
  };

  onCloseLoading = () => {
    this.setState({
      loading: false,
    });
  }

  constructor(props: LoadingScreenProps) {
    super(props);
    this.state = {
        loading: props.loading,
    }
  }

  componentDidMount(): void {}

  render() {
    return (
      <Modal open={this.state.loading} onClose={this.onCloseLoading}>
        <Box sx={loadingStyle}>
            <div className="h-screen flex items-center justify-center"><CircularProgress color="secondary"/></div>
        </Box>
      </Modal>
    );
  }
}

export default LoadingScreen;