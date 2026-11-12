import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service (e.g., Sentry)
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Feather name="alert-circle" size={64} color="#EF4444" />
          <Text style={styles.title}>Oops! Something went wrong</Text>
          <Text style={styles.message}>
            We're sorry for the inconvenience. Please try again.
          </Text>
          {__DEV__ && this.state.error && (
            <Text style={styles.errorDetails}>
              {this.state.error.toString()}
            </Text>
          )}
          <TouchableOpacity style={styles.button} onPress={this.handleReset}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 24,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  errorDetails: {
    fontSize: 12,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#1B5E4F',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ErrorBoundary;
