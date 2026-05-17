import { useState, useCallback, useMemo } from 'react';
import { packageTiers, addons } from '../data/quoteOptions';

const initialState = {
  step: 1,
  selectedServices: [],
  selectedPackages: {},
  selectedAddons: [],
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
};

export const useQuoteBuilder = () => {
  const [state, setState] = useState(initialState);

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
      const selectedServices = isSelected
        ? prev.selectedServices.filter((id) => id !== serviceId)
        : [...prev.selectedServices, serviceId];

      const selectedPackages = { ...prev.selectedPackages };
      if (isSelected) {
        delete selectedPackages[serviceId];
      }

      return { ...prev, selectedServices, selectedPackages };
    });
  }, []);

  const selectPackage = useCallback((serviceId, tierId) => {
    setState((prev) => ({
      ...prev,
      selectedPackages: { ...prev.selectedPackages, [serviceId]: tierId },
    }));
  }, []);

  const toggleAddon = useCallback((addonId) => {
    setState((prev) => {
      const isSelected = prev.selectedAddons.includes(addonId);
      return {
        ...prev,
        selectedAddons: isSelected
          ? prev.selectedAddons.filter((id) => id !== addonId)
          : [...prev.selectedAddons, addonId],
      };
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

  const applicableAddons = useMemo(() => {
    return addons.filter((addon) =>
      addon.applicableTo.some((s) => state.selectedServices.includes(s))
    );
  }, [state.selectedServices]);

  const totalPrice = useMemo(() => {
    let total = 0;
    Object.entries(state.selectedPackages).forEach(([serviceId, tierId]) => {
      const tiers = packageTiers[serviceId];
      if (tiers) {
        const tier = tiers.find((t) => t.id === tierId);
        if (tier) total += tier.price;
      }
    });
    state.selectedAddons.forEach((addonId) => {
      const addon = addons.find((a) => a.id === addonId);
      if (addon) total += addon.price;
    });
    return total;
  }, [state.selectedPackages, state.selectedAddons]);

  const canProceed = useMemo(() => {
    switch (state.step) {
      case 1: return state.selectedServices.length > 0;
      case 2: return state.selectedServices.every((s) => state.selectedPackages[s]);
      case 3: return true;
      case 4: return state.eventDetails.date && state.eventDetails.location;
      case 5: return state.customerInfo.name && state.customerInfo.email && state.customerInfo.phone;
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
    state.selectedAddons.forEach((addonId) => {
      const addon = addons.find((a) => a.id === addonId);
      if (addon) {
        items.push({ type: 'addon', name: addon.name, price: addon.price });
      }
    });
    return { items, total: totalPrice, eventDetails: state.eventDetails, customerInfo: state.customerInfo };
  }, [state, totalPrice]);

  return {
    ...state,
    setStep, nextStep, prevStep,
    toggleService, selectPackage, toggleAddon,
    updateEventDetails, updateCustomerInfo,
    applicableAddons, totalPrice, canProceed,
    resetQuote, getQuoteSummary,
  };
};

export default useQuoteBuilder;
