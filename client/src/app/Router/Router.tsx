import React from 'react'
import { Toaster } from "@/shared/components/ui/toaster";
import { Toaster as Sonner } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Game from "@/pages/Game";
import Profile from "@/pages/Profile";
import Navbar from "@/shared/components/layout/Navbar";
import { StoreProvider } from "../StoreProvider";

const queryClient = new QueryClient();

export default function Router() {
  return (
    <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <StoreProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/game" element={<Game />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </StoreProvider>
    </HelmetProvider>
  </QueryClientProvider>
  )
}
