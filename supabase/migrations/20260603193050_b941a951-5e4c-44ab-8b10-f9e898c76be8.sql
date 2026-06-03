
-- client-attachments: client sees own, superadmin manages all
create policy "Client reads own attachments" on storage.objects for select to authenticated
using (
  bucket_id = 'client-attachments'
  and (storage.foldername(name))[1] = auth.uid()::text
);
create policy "Superadmin reads attachments" on storage.objects for select to authenticated
using (bucket_id = 'client-attachments' and public.has_role(auth.uid(), 'superadmin'));
create policy "Superadmin writes attachments" on storage.objects for insert to authenticated
with check (bucket_id = 'client-attachments' and public.has_role(auth.uid(), 'superadmin'));
create policy "Superadmin updates attachments" on storage.objects for update to authenticated
using (bucket_id = 'client-attachments' and public.has_role(auth.uid(), 'superadmin'));
create policy "Superadmin deletes attachments" on storage.objects for delete to authenticated
using (bucket_id = 'client-attachments' and public.has_role(auth.uid(), 'superadmin'));

-- popup-images and trust-logos: public read via anon, admin write
create policy "Anyone reads popup images" on storage.objects for select to anon, authenticated
using (bucket_id = 'popup-images');
create policy "Superadmin manages popup images" on storage.objects for all to authenticated
using (bucket_id = 'popup-images' and public.has_role(auth.uid(), 'superadmin'))
with check (bucket_id = 'popup-images' and public.has_role(auth.uid(), 'superadmin'));

create policy "Anyone reads trust logos" on storage.objects for select to anon, authenticated
using (bucket_id = 'trust-logos');
create policy "Superadmin manages trust logos" on storage.objects for all to authenticated
using (bucket_id = 'trust-logos' and public.has_role(auth.uid(), 'superadmin'))
with check (bucket_id = 'trust-logos' and public.has_role(auth.uid(), 'superadmin'));
