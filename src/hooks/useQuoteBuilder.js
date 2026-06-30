import { useState, useCallback, useMemo, useEffect } from 'react';
import { packageTiers, addons, eventServicesList, weddingEvents, sareeEvents } from '../data/quoteOptions';

const allEvents = [...weddingEvents, ...sareeEvents];
const eventBasedServices = ['wedding', 'sareeCeremony'];
const isEventBased = (serviceId) => eventBasedServices.includes(serviceId);

const initialState = {
  step: 1,
  selectedServices: [],
  selectedPackages: {},
  selectedEvents: [],
  eventServices: {},
  selectedAddons: [],
  addonQuantities: {},
  eventDays: {},
  eventDates: {},
  eventDetails: {
    date: '',
    location: '',
    numberOfDays: 1,
    specialRequests: '',
    referralSource: '',
  },
  customerInfo: {
    name: '',
    email: '',
    phone: '',
  },
  leadCaptured: false,
};

const SESSION_KEY = 'quoteBuilderState';

const getInitialState = () => {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge deeply so any new fields in initialState are included
      return {
        ...initialState,
        ...parsed,
        eventDetails: { ...initialState.eventDetails, ...parsed.eventDetails },
        customerInfo: { ...initialState.customerInfo, ...parsed.customerInfo },
        eventDates: { ...initialState.eventDates, ...parsed.eventDates },
      };
    }
  } catch (e) {
    console.error("Error reading from sessionStorage", e);
  }
  return initialState;
};

export const useQuoteBuilder = () => {
  const [state, setState] = useState(getInitialState());

  // Persist entire state to sessionStorage on every change
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving quote state to sessionStorage', e);
    }
  }, [state]);

  const setStep = useCallback((step) => {
    setState((prev) => ({ ...prev, step }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => ({ ...prev, step: Math.min(prev.step + 1, 5) }));
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => ({ ...prev, step: Math.max(prev.step - 1, 1) }));
  }, []);

  const toggleService = useCallback((serviceId) => {
    setState((prev) => {
      const isSelected = prev.selectedServices.includes(serviceId);
      
      if (isSelected) {
        return { ...prev, selectedServices: [], selectedPackages: {}, selectedEvents: [], eventServices: {} };
      } else {
        return { ...prev, selectedServices: [serviceId], selectedPackages: {}, selectedEvents: [], eventServices: {} };
      }
    });
  }, []);

  const selectPackage = useCallback((serviceId, tierId) => {
    setState((prev) => {
      const currentSelection = prev.selectedPackages[serviceId];
      const updatedPackages = { ...prev.selectedPackages };
      if (currentSelection === tierId) {
        delete updatedPackages[serviceId];
      } else {
        updatedPackages[serviceId] = tierId;
      }
      return {
        ...prev,
        selectedPackages: updatedPackages,
      };
    });
  }, []);

  const toggleEvent = useCallback((eventId) => {
    setState((prev) => {
      const isSelected = prev.selectedEvents.includes(eventId);
      const selectedEvents = isSelected
        ? prev.selectedEvents.filter((id) => id !== eventId)
        : [...prev.selectedEvents, eventId];
        
      const eventServices = { ...prev.eventServices };
      const eventDates = { ...prev.eventDates };
      if (isSelected) {
        delete eventServices[eventId];
        delete eventDates[eventId];
      }
      
      return { ...prev, selectedEvents, eventServices, eventDates };
    });
  }, []);

  const toggleEventService = useCallback((eventId, serviceId) => {
    setState((prev) => {
      const eventSelections = prev.eventServices[eventId] || [];
      const isSelected = eventSelections.includes(serviceId);
      
      let updatedEventSelections = isSelected
        ? eventSelections.filter(id => id !== serviceId)
        : [...eventSelections, serviceId];

      if (eventId === 'prewedding' && !isSelected) {
        if (serviceId === 'prewedding_photo') {
          updatedEventSelections = ['prewedding_photo'];
        } else if (serviceId === 'prewedding_photo_video') {
          updatedEventSelections = ['prewedding_photo_video'];
        }
      }

      let selectedEvents = [...prev.selectedEvents];
      if (updatedEventSelections.length > 0 && !selectedEvents.includes(eventId)) {
        selectedEvents.push(eventId);
      } else if (updatedEventSelections.length === 0 && selectedEvents.includes(eventId)) {
        selectedEvents = selectedEvents.filter(id => id !== eventId);
      }
      
      return {
        ...prev,
        selectedEvents,
        eventServices: { ...prev.eventServices, [eventId]: updatedEventSelections }
      };
    });
  }, []);

  const toggleAddon = useCallback((addonId) => {
    setState((prev) => {
      const isSelected = prev.selectedAddons.includes(addonId);
      const selectedAddons = isSelected
        ? prev.selectedAddons.filter((id) => id !== addonId)
        : [...prev.selectedAddons, addonId];
      const addonQuantities = { ...prev.addonQuantities };
      if (isSelected) {
        delete addonQuantities[addonId];
      } else {
        addonQuantities[addonId] = 1;
      }
      return {
        ...prev,
        selectedAddons,
        addonQuantities
      };
    });
  }, []);

  const updateEventDays = useCallback((eventId, days) => {
    setState((prev) => ({
      ...prev,
      eventDays: { ...prev.eventDays, [eventId]: Math.max(1, days) }
    }));
  }, []);

  const updateEventDate = useCallback((eventId, date) => {
    setState((prev) => ({
      ...prev,
      eventDates: { ...prev.eventDates, [eventId]: date }
    }));
  }, []);

  const updateAddonQuantity = useCallback((addonId, qty) => {
    setState((prev) => {
      const addonQuantities = { ...prev.addonQuantities, [addonId]: Math.max(0, qty) };
      let selectedAddons = [...prev.selectedAddons];
      if (qty <= 0) {
        selectedAddons = selectedAddons.filter(id => id !== addonId);
        delete addonQuantities[addonId];
      } else if (!selectedAddons.includes(addonId)) {
        selectedAddons.push(addonId);
      }
      return { ...prev, selectedAddons, addonQuantities };
    });
  }, []);

  const updateEventDetails = useCallback((field, value) => {
    setState((prev) => ({
      ...prev,
      eventDetails: { ...prev.eventDetails, [field]: value },
    }));
  }, []);

  const updateCustomerInfo = useCallback((field, value) => {
    setState((prev) => ({
      ...prev,
      customerInfo: { ...prev.customerInfo, [field]: value },
    }));
  }, []);

  const captureLead = useCallback(async (leadData) => {
    if (state.leadCaptured) return;
    
    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycby605S3bhvZiQ0DmRKWUhgveSH2LrwO7gdlwEP0G9H0kXWbk4qIKq9u-lnUmytVpOJDiw/exec';
      const formData = new FormData();
      formData.append('Name', leadData?.name || state.customerInfo.name);
      formData.append('Phone', leadData?.phone || state.customerInfo.phone);
      formData.append('EventDate', leadData?.date || state.eventDetails.date);
      // Ensure 'Date' header in the sheet gets filled by the script, or we can send it
      // but the script already handles 'Date' automatically: header === 'Date' ? new Date() : e.parameter[header]

      await fetch(scriptURL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Prevent CORS issues with Google Apps Script
      });
      
      // State is auto-persisted via the useEffect above

      setState(prev => ({ ...prev, leadCaptured: true }));
    } catch (error) {
      console.error("Failed to capture lead:", error);
    }
  }, [state.customerInfo, state.eventDetails, state.leadCaptured]);

  const applicableAddons = useMemo(() => {
    return addons.filter((addon) => {
      if (addon.id === 'standardalbum') {
        let isEligible = false;
        if (state.selectedServices.includes('milestone')) {
          const tier = state.selectedPackages['milestone'];
          if (tier === 'essential' || tier === 'premium') {
            isEligible = true;
          }
        }
        if (state.selectedServices.includes('maternity')) {
          const tier = state.selectedPackages['maternity'];
          if (tier === 'premium' || tier === 'luxury') {
            isEligible = true;
          }
        }
        if (!isEligible) return false;
      }
      return addon.applicableTo.some((s) => state.selectedServices.includes(s));
    });
  }, [state.selectedServices, state.selectedPackages]);

  const totalPrice = useMemo(() => {
    let total = 0;
    Object.entries(state.selectedPackages).forEach(([serviceId, tierId]) => {
      const tiers = packageTiers[serviceId];
      if (tiers) {
        const tier = tiers.find((t) => t.id === tierId);
        if (tier) total += tier.price;
      }
    });
    Object.entries(state.eventServices).forEach(([eventId, services]) => {
      const eventObj = weddingEvents.find(e => e.id === eventId);
      const days = eventObj?.multiDay ? (state.eventDays?.[eventId] || 1) : 1;
      services.forEach(serviceId => {
        const s = eventServicesList.find(e => e.id === serviceId);
        if (s) total += s.price * days;
      });
    });
    const activeAddons = state.selectedAddons.filter((id) =>
      applicableAddons.some((a) => a.id === id)
    );
    activeAddons.forEach((addonId) => {
      const addon = addons.find((a) => a.id === addonId);
      if (addon) {
        const qty = state.addonQuantities?.[addonId] || 1;
        total += addon.price * qty;
      }
    });
    return total;
  }, [state.selectedPackages, state.eventServices, state.selectedAddons, state.addonQuantities, state.eventDays, applicableAddons]);

  const canProceed = useMemo(() => {
    switch (state.step) {
      case 1: return state.selectedServices.length > 0;
      case 2: 
        if (state.selectedServices.some(isEventBased)) {
          const hasAnyService = Object.values(state.eventServices).some(services => services?.length > 0);
          return hasAnyService;
        }
        return state.selectedServices.every((s) => state.selectedPackages[s]);
      case 3: return true; // Addons
      case 4: return state.eventDetails.location; // Event details
      case 5: return true; // Review & Submit
      default: return false;
    }
  }, [state]);

  const resetQuote = useCallback(() => {
    setState(initialState);
  }, []);

  const getQuoteSummary = useCallback(() => {
    const items = [];
    Object.entries(state.selectedPackages).forEach(([serviceId, tierId]) => {
      const tiers = packageTiers[serviceId];
      if (tiers) {
        const tier = tiers.find((t) => t.id === tierId);
        if (tier) {
          items.push({ type: 'package', serviceId, name: `${serviceId} - ${tier.name}`, price: tier.price, features: tier.features });
        }
      }
    });
    Object.entries(state.eventServices).forEach(([eventId, services]) => {
      const eventObj = allEvents.find(e => e.id === eventId);
      const isMulti = eventObj?.multiDay;
      const days = isMulti ? (state.eventDays?.[eventId] || 1) : 1;
      const eventServicesArr = services.map(serviceId => {
        const s = eventServicesList.find(e => e.id === serviceId);
        return { name: s?.name, price: (s?.price || 0) * days };
      });
      if (eventServicesArr.length > 0) {
         const eventName = days > 1 ? `Event: ${eventId.replace('_', ' ').toUpperCase()} (${days} Days)` : `Event: ${eventId.replace('_', ' ').toUpperCase()}`;
         const eventDate = state.eventDates?.[eventId] || '';
         items.push({ 
           type: 'event', 
           eventId, 
           name: eventName, 
           services: eventServicesArr, 
           price: eventServicesArr.reduce((sum, s) => sum + s.price, 0), 
           days,
           date: eventDate
         });
      }
    });
    const activeAddons = state.selectedAddons.filter((id) =>
      applicableAddons.some((a) => a.id === id)
    );
    activeAddons.forEach((addonId) => {
      const addon = addons.find((a) => a.id === addonId);
      if (addon) {
        const qty = state.addonQuantities?.[addonId] || 1;
        items.push({ 
          type: 'addon', 
          name: qty > 1 ? `${addon.name} (Qty: ${qty})` : addon.name, 
          price: addon.price * qty,
          quantity: qty 
        });
      }
    });
    return { items, total: totalPrice, eventDetails: state.eventDetails, customerInfo: state.customerInfo };
  }, [state, totalPrice, applicableAddons]);


  return {
    ...state,
    setStep, nextStep, prevStep,
    toggleService, selectPackage, toggleEvent, toggleEventService, toggleAddon, updateAddonQuantity, updateEventDays,
    updateEventDetails, updateCustomerInfo, captureLead, updateEventDate,
    applicableAddons, totalPrice, canProceed,
    resetQuote, getQuoteSummary,
  };
};

export default useQuoteBuilder;
