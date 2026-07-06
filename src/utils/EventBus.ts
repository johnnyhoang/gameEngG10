type EventCallback = (payload: any) => void;

class EventBus {
  private listeners: { [key: string]: EventCallback[] } = {};

  subscribe(eventType: string, callback: EventCallback) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);
    return () => {
      this.listeners[eventType] = this.listeners[eventType].filter(cb => cb !== callback);
    };
  }

  publish(eventType: string, payload: any) {
    // Console log events for debugging/logging
    console.log(`[EventBus] Publish: ${eventType}`, payload);
    if (this.listeners[eventType]) {
      this.listeners[eventType].forEach(callback => {
        try {
          callback(payload);
        } catch (error) {
          console.error(`Error in event listener for ${eventType}:`, error);
        }
      });
    }
  }
}

export const eventBus = new EventBus();
