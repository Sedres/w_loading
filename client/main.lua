AddEventHandler("onClientResourceStart", function(resource)
    if resource == GetCurrentResourceName() then
        SetNuiFocus(true, true)
    end
end)
