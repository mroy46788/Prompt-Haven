/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import AllPrompts from './pages/AllPrompts';
import PromptDetail from './pages/PromptDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import SubmitPrompt from './pages/SubmitPrompt';
import Pricing from './pages/Pricing';
import AICreationEdit from './pages/AICreationEdit';
import ImageToPrompt from './pages/ImageToPrompt';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Admin from './pages/Admin';

export default function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="prompts" element={<AllPrompts />} />
            <Route path="prompts/:id" element={<PromptDetail />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="submit" element={<SubmitPrompt />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="tools/edit" element={<AICreationEdit />} />
            <Route path="tools/image-to-prompt" element={<ImageToPrompt />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfService />} />
            {/* Fallback for other routes */}
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  );
}
