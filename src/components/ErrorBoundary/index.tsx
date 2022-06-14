import { resolve } from 'inversify-react';
import { parseCookies } from 'nookies';
import { Component, ErrorInfo, ReactNode } from 'react';

import TYPES from '@containers/global.types';

import type { LoggerServiceType } from '@services/logger';

import OhNoScreen from './OhNoScreen';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  @resolve(TYPES.LoggerService)
  private readonly loggerService!: LoggerServiceType;

  state: State = { error: null };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const cookies = parseCookies();

    this.setState({ error });

    this.loggerService.log({
      error,
      errorInfo,
      user: {
        token: cookies.user_token,
      },
    });
  }

  render() {
    if (this.state.error) {
      return (
        <OhNoScreen
          onDisableError={() => this.setState({ error: null })}
          onSendFeedback={this.loggerService.log}
          error={this.state.error}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
