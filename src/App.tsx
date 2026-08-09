/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Schedule from './components/Schedule';
import Rewards from './components/Rewards';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-white antialiased selection:bg-cyan-400 selection:text-zinc-950">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Hero />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="rewards" element={<Rewards />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
