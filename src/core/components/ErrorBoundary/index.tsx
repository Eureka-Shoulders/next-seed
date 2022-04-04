import TYPES from '@containers/global.types';
import { resolve } from 'inversify-react';
import { Component, ErrorInfo, ReactNode } from 'react';

import { LoggerServiceType } from '@core/services/logger';

import OhNoScreen from './OhNoScreen';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  @resolve(TYPES.LoggerService)
  private readonly loggerService!: LoggerServiceType;

  state: State = {
    hasError: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.loggerService.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <OhNoScreen />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
